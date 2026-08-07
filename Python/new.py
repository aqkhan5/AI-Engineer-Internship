class LibraryError(Exception):
    def __init__(self, message):
        super().__init__(message)

class NotFoundError(LibraryError):
    # raise exception when there will be no book found or no customer found
    pass

class BookUnavailableError(LibraryError):
    # raise exception when there will be no book available
    pass

class BorrowLimitReachedError(LibraryError):
    # raise exception when there will be borrow limit reached
    pass

class InvalidReturnError(LibraryError):
    # raise exception when any member try to return the book they currenly doesn't hold.
    pass


# =====================================================================
# SECTION 2: MODELS & FUNCTIONAL HELPERS
# =====================================================================

from dataclasses import dataclass, field
from typing import List

@dataclass
class Book:
    book_id: str
    title: str
    author: str
    is_available: bool = True

@dataclass
class Member:
    member_id: str
    name: str
    member_type: str  # "Standard" or "VIP"
    borrowed_books: List[Book] = field(default_factory=list)


# ---------------------------------------------------------------------
# FUNCTIONAL HELPERS (Loops & IF-ELIF Logic)
# ---------------------------------------------------------------------

def get_member_borrow_limit(member: Member) -> int:
    """Returns borrowing limit using basic if-elif logic based on tier."""
    if member.member_type == "VIP":
        return 5
    elif member.member_type == "Standard":
        return 2
    else:
        # Default fallback limit
        return 1


def check_can_borrow(member: Member) -> bool:
    """Checks if the member has room under their limit."""
    limit = get_member_borrow_limit(member)
    
    if len(member.borrowed_books) >= limit:
        return False
    else:
        return True


def find_book_in_list(book_list: List[Book], book_id: str):
    """Utility helper using a simple for-loop to locate a book by ID."""
    for book in book_list:
        if book.book_id == book_id:
            return book
    return None


# =====================================================================
# SECTION 3: LIBRARY MANAGER & WORKFLOWS
# =====================================================================

class Library:
    """Central manager storing books and members with clear functional methods."""

    def __init__(self):
        # In-memory storage using simple dictionaries
        self.books = {}    # book_id -> Book instance
        self.members = {}  # member_id -> Member instance

    # -----------------------------------------------------------------
    # REGISTRATION & LOOKUPS
    # -----------------------------------------------------------------
    def add_book(self, book: Book):
        """Adds a new book to the library."""
        self.books[book.book_id] = book

    def register_member(self, member: Member):
        """Registers a new member in the library."""
        self.members[member.member_id] = member

    def get_book(self, book_id: str) -> Book:
        """Looks up a book by ID using standard dictionary check."""
        if book_id in self.books:
            return self.books[book_id]
        else:
            raise NotFoundError(f"Book with ID '{book_id}' does not exist.")

    def get_member(self, member_id: str) -> Member:
        """Looks up a member by ID using standard dictionary check."""
        if member_id in self.members:
            return self.members[member_id]
        else:
            raise NotFoundError(f"Member with ID '{member_id}' does not exist.")

    # -----------------------------------------------------------------
    # LISTING OPERATIONS (Loops & Conditional Logic)
    # -----------------------------------------------------------------
    def list_available_books(self) -> List[Book]:
        """Iterates through books and collects available ones using a loop."""
        available = []
        for book in self.books.values():
            if book.is_available:
                available.append(book)
        return available

    def list_member_borrowed_books(self, member_id: str) -> List[Book]:
        """Returns the list of currently borrowed books for a specific member."""
        member = self.get_member(member_id)
        return member.borrowed_books

    # -----------------------------------------------------------------
    # CORE WORKFLOW: BORROWING
    # -----------------------------------------------------------------
    def borrow_book(self, member_id: str, book_id: str):
        """Validates rules and processes a book borrow request."""
        # 1. Validate Member & Book Existence
        member = self.get_member(member_id)
        book = self.get_book(book_id)

        # 2. Check Book Availability
        if not book.is_available:
            raise BookUnavailableError(f"Cannot borrow: '{book.title}' is currently unavailable.")

        # 3. Check Member Borrowing Limit
        if not check_can_borrow(member):
            limit = get_member_borrow_limit(member)
            raise BorrowLimitReachedError(
                f"Cannot borrow: Member '{member.name}' has reached their limit of {limit} book(s)."
            )

        # 4. Process Borrow Action
        book.is_available = False
        member.borrowed_books.append(book)
        print(f"SUCCESS: '{book.title}' borrowed by {member.name}.")

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

        # =====================================================================
# SECTION 4: DEMONSTRATION WORKFLOW
# =====================================================================

def run_demo():
    print("==================================================")
    print("      LIBRARY MANAGEMENT SYSTEM DEMONSTRATION     ")
    print("==================================================\n")

    # 1. Initialize Library
    library = Library()

    # 2. Add Books
    b1 = Book(book_id="B101", title="Python Crash Course", author="Eric Matthes")
    b2 = Book(book_id="B102", title="Clean Code", author="Robert C. Martin")
    b3 = Book(book_id="B103", title="Designing Data-Intensive Applications", author="Martin Kleppmann")
    
    library.add_book(b1)
    library.add_book(b2)
    library.add_book(b3)
    print("--> 3 Books added to the library.")

    # 3. Register Members
    m1 = Member(member_id="M001", name="Ali", member_type="Standard")  # Limit: 2
    m2 = Member(member_id="M002", name="Sara", member_type="VIP")       # Limit: 5

    library.register_member(m1)
    library.register_member(m2)
    print("--> Registered Members: Ali (Standard, Limit: 2) and Sara (VIP, Limit: 5).\n")

    # -----------------------------------------------------------------
    # SCENARIO 1: Successful Borrow & Available Books List
    # -----------------------------------------------------------------
    print("--- TEST 1: Successful Borrow ---")
    try:
        library.borrow_book("M001", "B101")
        
        available_books = library.list_available_books()
        print(f"Available Books Count: {len(available_books)}")
        for b in available_books:
            print(f" - {b.title} (ID: {b.book_id})")
    except LibraryError as e:
        print(f"ERROR: {e}")
    print()

    # -----------------------------------------------------------------
    # SCENARIO 2: Rejection - Unavailable Book
    # -----------------------------------------------------------------
    print("--- TEST 2: Borrowing Unavailable Book ---")
    try:
        # Sara tries to borrow B101, which Ali already holds
        library.borrow_book("M002", "B101")
    except LibraryError as e:
        print(f"REJECTED AS EXPECTED: {e}")
    print()

    # -----------------------------------------------------------------
    # SCENARIO 3: Rejection - Borrow Limit Reached
    # -----------------------------------------------------------------
    print("--- TEST 3: Exceeding Borrowing Limit ---")
    try:
        # Ali (Standard, Limit 2) borrows second book
        library.borrow_book("M001", "B102")
        
        # Ali attempts to borrow a 3rd book (Exceeds limit of 2)
        library.borrow_book("M001", "B103")
    except LibraryError as e:
        print(f"REJECTED AS EXPECTED: {e}")
    print()

    # -----------------------------------------------------------------
    # SCENARIO 4: Rejection - Invalid Return
    # -----------------------------------------------------------------
    print("--- TEST 4: Returning an Unheld Book ---")
    try:
        # Sara attempts to return B103, which she never borrowed
        library.return_book("M002", "B103")
    except LibraryError as e:
        print(f"REJECTED AS EXPECTED: {e}")
    print()

    # -----------------------------------------------------------------
    # SCENARIO 5: Successful Return with Overdue Fine
    # -----------------------------------------------------------------
    print("--- TEST 5: Return with Late Fine ---")
    try:
        # Ali returns B101, 3 days late at $2.00/day
        library.return_book("M001", "B101", days_overdue=3, daily_fine_rate=2.0)
    except LibraryError as e:
        print(f"ERROR: {e}")
    print()

    # -----------------------------------------------------------------
    # SCENARIO 6: Rejection - Entity Not Found
    # -----------------------------------------------------------------
    print("--- TEST 6: Non-Existent Book/Member Lookup ---")
    try:
        library.borrow_book("M999", "B101")
    except LibraryError as e:
        print(f"REJECTED AS EXPECTED: {e}")
    print()

    print("==================================================")
    print("           DEMONSTRATION COMPLETED               ")
    print("==================================================")


if __name__ == "__main__":
    run_demo()