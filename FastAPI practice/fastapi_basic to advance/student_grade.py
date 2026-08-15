# Student Grade Management API
from fastapi import FastAPI, HTTPException, Path, Query, Body
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

app = FastAPI(
    title="Student Grade Management API",
    description="API for managing students and their grades",
    version="1.0.0"
)

# ==================== IN-MEMORY DATABASE ====================
students_db = {}
subjects_db = {}
grades_db = []

# ID counters
student_id_counter = 1
subject_id_counter = 1

# ==================== PYDANTIC MODELS ====================

# Student Models
class StudentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    grade_level: int = Field(..., ge=1, le=12)
    enrolled: bool = True

class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    grade_level: int
    enrolled: bool = True

# Subject Models
class SubjectCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    teacher: str = Field(..., min_length=2, max_length=100)

class SubjectResponse(BaseModel):
    id: int
    name: str
    teacher: str

# Grade Models
class GradeCreate(BaseModel):
    student_id: int
    subject_id: int
    score: float = Field(..., ge=0, le=100)

class GradeResponse(BaseModel):
    student_id: int
    subject_id: int
    score: float
    date_recorded: str

# Average Response
class AverageResponse(BaseModel):
    student_id: Optional[int] = None
    subject_id: Optional[int] = None
    average: float
    total_grades: int

# ==================== HELPER FUNCTIONS ====================

def find_student(student_id: int):
    """Helper to find a student by ID"""
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    return students_db[student_id]

def find_subject(subject_id: int):
    """Helper to find a subject by ID"""
    if subject_id not in subjects_db:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subjects_db[subject_id]

def get_student_grades(student_id: int) -> List[dict]:
    """Get all grades for a student"""
    return [g for g in grades_db if g['student_id'] == student_id]

def get_subject_grades(subject_id: int) -> List[dict]:
    """Get all grades for a subject"""
    return [g for g in grades_db if g['subject_id'] == subject_id]

def calculate_average(grades_list: List[dict]) -> float:
    """Calculate average from a list of grades"""
    if not grades_list:
        return 0.0
    total = sum(g['score'] for g in grades_list)
    return round(total / len(grades_list), 2)

# ==================== STUDENT ENDPOINTS ====================

# POST - Create student
@app.post("/students/", response_model=StudentResponse, status_code=201)
def create_student(student: StudentCreate):
    global student_id_counter

    new_student = {
        "id": student_id_counter,
        "name": student.name,
        "email": student.email,
        "grade_level": student.grade_level,
        "enrolled": student.enrolled
    }
    students_db[student_id_counter] = new_student
    student_id_counter += 1

    return new_student

# GET - Get all students with filters
@app.get("/students/", response_model=List[StudentResponse])
def get_all_students(
    grade_level: Optional[int] = Query(None, ge=1, le=12),
    name: Optional[str] = None,
    enrolled: Optional[bool] = None
):
    result = list(students_db.values())
    
    if grade_level is not None:
        result = [s for s in result if s['grade_level'] == grade_level]
    
    if name is not None:
        result = [s for s in result if name.lower() in s['name'].lower()]
    
    if enrolled is not None:
        result = [s for s in result if s['enrolled'] == enrolled]
    
    return result

# ==================== STUDENT STATIC ROUTES (SPECIFIC) ====================

# GET - Top students
@app.get("/students/top", response_model=List[dict])
def get_top_students(limit: int = Query(3, ge=1, le=10)):
    student_averages = []
    
    for student_id in students_db.keys():
        grades = get_student_grades(student_id)
        if grades:
            avg = calculate_average(grades)
            student_averages.append({
                "student_id": student_id,
                "name": students_db[student_id]['name'],
                "average": avg
            })
    
    student_averages.sort(key=lambda x: x['average'], reverse=True)
    return student_averages[:limit]

# GET - Student average
@app.get("/students/{student_id}/average", response_model=AverageResponse)
def get_student_average(student_id: int = Path(..., gt=0)):
    find_student(student_id)
    
    student_grades = get_student_grades(student_id)
    avg = calculate_average(student_grades)
    
    return AverageResponse(
        student_id=student_id,
        average=avg,
        total_grades=len(student_grades)
    )

# ==================== STUDENT DYNAMIC ROUTES ====================

# GET - Get specific student
@app.get("/students/{student_id}", response_model=StudentResponse)
def get_student(student_id: int = Path(..., gt=0)):
    return find_student(student_id)

# PUT - Update student
@app.put("/students/{student_id}", response_model=StudentResponse)
def update_student(student_id: int, update_student: StudentCreate):
    student = find_student(student_id)
    
    student['name'] = update_student.name
    student['email'] = update_student.email
    student['grade_level'] = update_student.grade_level
    student['enrolled'] = update_student.enrolled
    
    return student

# DELETE - Delete student
@app.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: int):
    find_student(student_id)
    
    global grades_db
    grades_db = [g for g in grades_db if g['student_id'] != student_id]
    del students_db[student_id]
    return

# ==================== SUBJECT ENDPOINTS ====================

# POST - Create subject
@app.post("/subjects/", response_model=SubjectResponse, status_code=201)
def create_subject(subject: SubjectCreate):
    global subject_id_counter
    
    new_subject = {
        "id": subject_id_counter,
        "name": subject.name,
        "teacher": subject.teacher
    }
    
    subjects_db[subject_id_counter] = new_subject
    subject_id_counter += 1
    
    return new_subject

# GET - Get all subjects
@app.get("/subjects/", response_model=List[SubjectResponse])
def get_all_subjects():
    return list(subjects_db.values())

# ==================== SUBJECT STATIC ROUTES (SPECIFIC) ====================

# GET - Subject average
@app.get("/subjects/{subject_id}/average", response_model=AverageResponse)
def get_subject_average(subject_id: int = Path(..., gt=0)):
    find_subject(subject_id)
    
    subject_grades = get_subject_grades(subject_id)
    avg = calculate_average(subject_grades)
    
    return AverageResponse(
        subject_id=subject_id,
        average=avg,
        total_grades=len(subject_grades)
    )

# ==================== SUBJECT DYNAMIC ROUTES ====================

# GET - Get specific subject
@app.get("/subjects/{subject_id}", response_model=SubjectResponse)
def get_subject(subject_id: int = Path(..., gt=0)):
    return find_subject(subject_id)

# PUT - Update subject
@app.put("/subjects/{subject_id}", response_model=SubjectResponse)
def update_subject(subject_id: int, updated_subject: SubjectCreate):
    subject = find_subject(subject_id)
    
    subject['name'] = updated_subject.name
    subject['teacher'] = updated_subject.teacher
    
    return subject

# DELETE - Delete subject
@app.delete("/subjects/{subject_id}", status_code=204)
def delete_subject(subject_id: int):
    find_subject(subject_id)
    
    global grades_db
    grades_db = [g for g in grades_db if g['subject_id'] != subject_id]
    del subjects_db[subject_id]
    return

# ==================== GRADE ENDPOINTS ====================

# POST - Add grade
@app.post("/grades/", response_model=GradeResponse, status_code=201)
def add_grade(grade: GradeCreate):
    find_student(grade.student_id)
    find_subject(grade.subject_id)
    
    new_grade = {
        "student_id": grade.student_id,
        "subject_id": grade.subject_id,
        "score": grade.score,
        "date_recorded": datetime.now().isoformat()
    }
    
    grades_db.append(new_grade)
    return new_grade

# GET - Student's grades
@app.get("/grades/student/{student_id}", response_model=List[GradeResponse])
def get_student_grades_endpoint(student_id: int = Path(..., gt=0)):
    find_student(student_id)
    return get_student_grades(student_id)

# GET - Subject's grades
@app.get("/grades/subject/{subject_id}", response_model=List[GradeResponse])
def get_subject_grades_endpoint(subject_id: int = Path(..., gt=0)):
    find_subject(subject_id)
    return get_subject_grades(subject_id)

# PUT - Update grade
@app.put("/grades/{student_id}/{subject_id}", response_model=GradeResponse)
def update_grade(
    student_id: int = Path(..., gt=0),
    subject_id: int = Path(..., gt=0),
    score: float = Body(..., ge=0, le=100)
):
    find_student(student_id)
    find_subject(subject_id)
    
    for grade in grades_db:
        if grade['student_id'] == student_id and grade['subject_id'] == subject_id:
            grade['score'] = score
            grade['date_recorded'] = datetime.now().isoformat()
            return grade
    
    raise HTTPException(
        status_code=404,
        detail="Grade not found for this student and subject"
    )

# DELETE - Delete grade
@app.delete("/grades/{student_id}/{subject_id}", status_code=204)
def delete_grade(
    student_id: int = Path(..., gt=0),
    subject_id: int = Path(..., gt=0)
):
    global grades_db
    
    find_student(student_id)
    find_subject(subject_id)
    
    for index, grade in enumerate(grades_db):
        if grade['student_id'] == student_id and grade['subject_id'] == subject_id:
            grades_db.pop(index)
            return
    
    raise HTTPException(
        status_code=404,
        detail="Grade not found for this student and subject"
    )

# ==================== HEALTH CHECK (OPTIONAL) ====================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "students": len(students_db),
        "subjects": len(subjects_db),
        "grades": len(grades_db)
    }