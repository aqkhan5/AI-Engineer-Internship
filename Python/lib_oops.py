# Library Mangement System.
from abc import ABC, abstractmethod
from typing import Dict
# Handling the exceptions to show errors.
# base exception class for all exception classes
class Library(Exception):
    def __init__ (sefl, message):
        super().__init__(message)

class NotFoundError(Library):
    # raise exceptional when there will be no book found or no customer found
    pass

class BookUnavailableError(Library):
    # raise exception when there will be no book available
    pass

class BorrowLimitRearchedError(Library):
    # raise exception when there will be borrow limit reached
    pass

class InvalidReturnError(Library):
    # raise exception when any member try to return the book they currenly doesn't hold.
    pass

# part 2 domain model
from dataclasses import dataclass, field
from typing import List

class Book:
    book_id: str
    title: str
    author: str
    is_available: bool = True

@dataclass
class Member:
    member_id: str
    name: str
    member_type: str
    borrowed_book: List[Book] = field(default_factory = List)

#loops
def get_member_borrow_limit(member: Member) -> int:
    """Returns borrowing limit using conditonals"""
    if member.member_type == "VIP":
        return 5
    elif member.member_type == "Standard":
        return 2
    else:
        return 1

def check_can_borrow(member: Member) -> bool:
    "check if the member have their limit left or not"
    limit = get_member_borrow_limit(member)

    if len(member.borrowed_books ) >= limit:
        return False
    else:
        return True
    
def find_book_in_list(book_list: List[Book], book_id: str):
    "Utility helper using a simple for loop to locate a book by ID."
    for book in book_list:
        if book.book_id == book_id:
            return book
    return None

def find_book_in_list(book_list: List[Book], book_id: str):
    """Utility helper using a simple for-loop to locate a book by ID."""
    for book in book_list:
        if book.book_id == book_id:
            return book
    return None


# section 3 library manager workflow
class Library:
    "central manager storing books and members with clear functional methods"

    def __init__(self):
        self.books = {}
        self.members={}

    def add_book(self, book: Book):
        "Adds a new book to the library."
        self.books[book.book_id] = book

    def register_member(self, member: Member):
        "Registers a new member in the library."
        self.members[member.member_id] = member

    def get_book(self, book_id: str) -> Book:
        "looks up a book by ID using dictionary check."
        if book_id in self.books:
            return self.books[book_id]
        else:
            raise NotFoundError(f"Book with ID '{book_id}' does not exist.")

    def get_member(self, member_id: str) -> Member:
        "looks up a member ID using standard dictionary check."
        if member_id in self.members:
            return self.members[member_id]
        else: raise NotFoundError(f"Member with ID '{member_id}' does not exist. ")

    def list_available_books(self) -> [Book]:
        "Iterates through books and collects available ones using a loop."

        available  = []
        for book in self.books.values():
            if book.is_available:
                available.append(book)
            return available

    def list_member_borrowed_book(self, member_id: str) -> List[Book]:
        "Returns the list of currently borrowed books for a specific members"
        member =  self.get_member(member_id)
        return member.borrowed_books

    # Borrowing conditions 
    def borrow_book(self, member_id: str, book_id: str):
        "Validates rules and processes a book borrow request."
        member = self. get_member(member_id)
        book = self. get_book(book_id)


    def borrow_book(self, member_id: str, book_id: str):
            """Validates rules and processes a book borrow request."""
            # 1. Validate Member & Book Existence
            member = self.get_member(member_id)
            book = self.get_book(book_id)

            # 2. Check Book Availability
            if not book.is_available:
                raise BookUnavailableError(f"Cannot borrow: '{book.title}' is currently unavailable.")

            # 3 Check Members limit
            if not check_can_borrow(member):
                limit = get_member_borrow_limit(member)
                raise BorrowLimitRearchedError(f"Cannot borrow: member '{member.name}' has reached their limit of {limit} book(s)")

            # 4 Process Borrow Action
            book.is_available = False
            member.borrowed_books.append(book)
            print(f"Success: '{book.title}' borrowed by {member.name}.")



    # -----------------------------------------------------------------
    # CORE WORKFLOW: RETURNING & FINE CALCULATION
    # -----------------------------------------------------------------
    def return_book(self, member_id: str, book_id: str, days_overdue: int = 0, daily_fine_rate: float = 2.0) -> float:
        """Validates rules, processes a book return, and calculates fines if overdue."""
        # 1. Validate Member & Book Existence
        member = self.get_member(member_id)
        book = self.get_book(book_id)

        # 2. Verify Member Actually Holds This Specific Book
        target_book = find_book_in_list(member.borrowed_books, book_id)
        if target_book is None:
            raise InvalidReturnError(
                f"Cannot return: Member '{member.name}' does not hold book '{book.title}' (ID: {book_id})."
            )

        # 3. Process Return Action
        member.borrowed_books.remove(target_book)
        book.is_available = True

        # 4. Calculate Overdue Fine
        fine_amount = 0.0
        if days_overdue > 0:
            fine_amount = days_overdue * daily_fine_rate
            print(f"SUCCESS: '{book.title}' returned by {member.name}. Fine applied: ${fine_amount:.2f} ({days_overdue} days overdue).")
        else:
            print(f"SUCCESS: '{book.title}' returned on time by {member.name}.")

        return fine_amount