from typing import Dict, List


# part 1 Custom Exception handling
# We define custom exceptions inheriting from the base Exception class.
# This ensures that invalid operations trigger explicit, clear failure
# messages rather than unhandled crashes or generic errors.

class LibraryError(Exception):
    """Base exception class for all custom domain errors in the library."""
    pass


class NotFoundError(LibraryError):
    """Raised when a specified Book id or Member id cannot be located."""
    pass




class BookUnavailableError(LibraryError):
    """Raised when a member attempts to borrow a book that is already on loan."""
    pass

class BorrowLimitReachedError(LibraryError):
    """Raised when a member attempts to borrow beyond their allowed limit."""
    pass

class InvalidReturnError(LibraryError):
    """Raised when attempting to return a book that the member does not hold."""
    pass



class IdentityMismatchError(LibraryError):
    """Raised when the provided member name does not match the registered record."""
    pass


# part2:Object oriented architechture

class Book:
    """
    Represents an individual book in the library system.
    Encapsulates book details and availability status.
    """

    def __init__(self, book_id: str, title: str, author: str):
        self.book_id: str = book_id
        self.title: str = title
        self.author: str = author
        self._is_available: bool = True  # hidden attribute tracking availability

    @property
    def is_available(self) -> bool:
        """Read-only property returning current availability state."""
        return self._is_available

    def mark_borrowed(self) -> None:
        """
        Marks book as unavailable when borrowed.
        Raises BookUnavailableError if already checked out.
        """
        if not self._is_available:
            raise BookUnavailableError(f"Book '{self.title}' (ID: {self.book_id}) is currently checked out by another member.")
        self._is_available = False

    def mark_returned(self) -> None:
        """restores book availability when returned."""
        self._is_available = True

    def __repr__(self) -> str:
        status = "Available" if self._is_available else "Borrowed"
        return f"Book(ID: {self.book_id}, Title: '{self.title}', Status: {status})"


class Member:
    """
    Represents a regular library member.
    Encapsulates member details and tracks currently borrowed books.
    """

    MAX_BORROW_LIMIT = 2  # standard uniform borrowing limit for all members

    def __init__(self, member_id: str, name: str):
        self.member_id: str = member_id
        self.name: str = name
        # Internal storage mapping book_id -> Book instance for active loans
        self.borrowed_books: Dict[str, Book] = {}



    def can_borrow(self) -> bool:
        """Checks if member is currently under their borrowing quota."""
        return len(self.borrowed_books) < self.MAX_BORROW_LIMIT

    def add_borrowed_book(self, book: Book) -> None:
        """
        Adds a book to the member's active loan list.
        Raises BorrowLimitReachedError if the member has reached their limit.
        """
        if not self.can_borrow():
            raise BorrowLimitReachedError(
                f"Member '{self.name}' has reached the maximum borrowing limit of {self.MAX_BORROW_LIMIT} books."
            )
        self.borrowed_books[book.book_id] = book

    def remove_borrowed_book(self, book_id: str) -> Book:
        """
        Removes a book from the active loan list during a return operation.
        Raises InvalidReturnError if the member does not hold the specified book.
        """
        if book_id not in self.borrowed_books:
            raise InvalidReturnError(
                f"Member '{self.name}' does not currently hold book ID '{book_id}'."
            )
        return self.borrowed_books.pop(book_id)

    def get_borrowed_titles(self) -> str:
        """Returns a human-readable list of currently borrowed book titles."""
        if not self.borrowed_books:
            return "No active loans"
        titles = [f"'{book.title}' (ID: {book.book_id})" for book in self.borrowed_books.values()]
        return ", ".join(titles)

    def __repr__(self) -> str:
        return f"Member(ID: {self.member_id}, Name: '{self.name}', Loans: {len(self.borrowed_books)}/{self.MAX_BORROW_LIMIT})"



# part 3 Central library coorinator


class Library:
    """
    Central manager storing books and members.
    Orchestrates borrowing and returning workflows while enforcing system rules.
    """

    def __init__(self):
        # master dictionaries for quick O(1) lookups
        self.books: Dict[str, Book] = {}
        self.members: Dict[str, Member] = {}

    
    # Registration and look-up
    
    def add_book(self, book: Book) -> None:
        """Registers a new book entity in the library system."""
        self.books[book.book_id] = book

    def register_member(self, member: Member) -> None:
        """Registers a new member entity in the library system."""
        self.members[member.member_id] = member

    def get_book(self, book_id: str) -> Book:
        """Retrieves a book by ID or raises NotFoundError if missing."""
        if book_id in self.books:
            return self.books[book_id]
        raise NotFoundError(f"Book ID '{book_id}' is not registered in the system.")

    def get_member(self, member_id: str) -> Member:
        """Retrieves a member by ID or raises NotFoundError if missing."""
        if member_id in self.members:
            return self.members[member_id]
        raise NotFoundError(f"Member ID '{member_id}' is not registered in the system.")

    def validate_member_identity(self, member_id: str, name: str) -> Member:
        """
        Verifies that a member exists and that the input name matches the registered record.
        Ensures user input matches existing system records before proceeding.
        """
        member = self.get_member(member_id)
        # Case-insensitive comparison for user friendliness
        if member.name.strip().lower() != name.strip().lower():
            raise IdentityMismatchError(
                f"Identity Mismatch: ID '{member_id}' belongs to '{member.name}', not '{name}'."
            )
        return member

    
    # display and reporting helpers
    
    def display_system_status(self) -> None:
        """Prints a visual overview of current registered members and books."""
        print("\n" + "=" * 65)
        print("                  CURRENT SYSTEM STATE                  ")
        print("=" * 65)

        print("\n[REGISTERED MEMBERS]")
        for m in self.members.values():
            print(f" • [{m.member_id}] {m.name:<10} | Active Loans ({len(m.borrowed_books)}/{m.MAX_BORROW_LIMIT}): {m.get_borrowed_titles()}")

        print("\n[LIBRARY CATALOGUE]")
        for b in self.books.values():
            status = "AVAILABLE" if b.is_available else "BORROWED"
            print(f" • [{b.book_id}] {b.title:<38} by {b.author:<18} [{status}]")
        print("=" * 65 + "\n")

    # -----------------------------------------------------------------
    # CORE WORKFLOW 1: BORROWING PROCESS
    # -----------------------------------------------------------------
    def borrow_book(self, member_id: str, name: str, book_id: str) -> None:
        """
        Executes a book borrowing request.
        Validates member identity, book existence, book availability, and limit quota.
        """
        # Step 1: Validate member exists and name matches record
        member = self.validate_member_identity(member_id, name)

        # Step 2: Validate book exists
        book = self.get_book(book_id)

        # Step 3 & 4: Attempt state update (will raise exception if unavailable or limit reached)
        book.mark_borrowed()
        try:
            member.add_borrowed_book(book)
        except BorrowLimitReachedError:
            # Rollback book state if member limit check fails
            book.mark_returned()
            raise

        print(f"\n[SUCCESS] Book '{book.title}' (ID: {book_id}) borrowed successfully by {member.name}.")

    
    # core work flow: returning process and calculation
    
    def return_book(self, member_id: str, name: str, book_id: str, days_overdue: int = 0, daily_fine_rate: float = 2.0) -> float:
        """
        Executes a book return request and calculates overdue fines if applicable.
        Validates member identity, book existence, and loan holding.
        """
        # Step 1: Validate member identity
        member = self.validate_member_identity(member_id, name)

        # Step 2: Validate book exists
        book = self.get_book(book_id)

        # Step 3: Remove book from member's active loans & mark as available
        returned_book = member.remove_borrowed_book(book_id)
        returned_book.mark_returned()

        # Step 4: Calculate fine if return is late
        fine_amount = 0.0
        if days_overdue > 0:
            fine_amount = days_overdue * daily_fine_rate
            print(f"\n[SUCCESS] Book '{book.title}' returned successfully by {member.name}.")
            print(f"--> LATE RETURN NOTICE: {days_overdue} day(s) overdue. Fine applied: ${fine_amount:.2f} (at ${daily_fine_rate:.2f}/day).")
        else:
            print(f"\n[SUCCESS] Book '{book.title}' returned on time by {member.name}.")

        return fine_amount



# part 4: data intialization and displaying data


def seed_initial_data(library: Library) -> None:
    """
    Pre-populates the library system with realistic records.
    Adds members and book, and sets up initial borrowing scenarios.
    """
    # 1. Register 8 Regular Members
    members = [
        Member("M001", "Ali"),
        Member("M002", "Usman"),
        Member("M003", "Hamza"),
        Member("M004", "Bilal"),
        Member("M005", "Zain"),
        Member("M006", "Sara"),
        Member("M007", "Ayesha"),
        Member("M008", "Fatima"),
    ]
    for m in members:
        library.register_member(m)

    # 2. Add 8 Books to the Catalog
    books = [
        Book("B01", "Python Crash Course", "Eric Matthes"),
        Book("B02", "System Design", "Robert C. Martin"),
        Book("B03", "My Brother", "Fatima Jinnah"),
        Book("B04", "Artificial Intelligence: A Modern Approach", "Stuart Russell"),
        Book("B05", "Master Your Emotions", "Thibaut Morossi"),
        Book("B06", "Introduction to Algorithms", "Thomas"),
        Book("B07", "Rich dad, Poor dad", "Robbert Kiyoski"),
        Book("B08", "48 laws of power", "Robbert Green"),
    ]
    for b in books:
        library.add_book(b)

    # 3. Pre-load Initial Borrowing Scenarios
    # Ali (M001) borrows 2 books -> Reaches maximum limit of 2
    library.borrow_book("M001", "Ali", "B01")
    library.borrow_book("M001", "Ali", "B02")

    # Usman (M002) borrows 1 book -> Has room for 1 more
    library.borrow_book("M002", "Usman", "B03")

    # Hamza (M003) borrows 1 book -> Has room for 1 more
    library.borrow_book("M003", "Hamza", "B04")


def main():
    """
    Interactive terminal application handling inputs and executing scenarios.
    """
    # Initialize system and populate initial data
    library = Library()
    seed_initial_data(library)

    print("\n==================================================")
    print("      WELCOME TO THE LIBRARY MANAGEMENT SYSTEM     ")
    print("==================================================")

    # Main interaction loop
    while True:
        # Display current system state for visual reference
        library.display_system_status()

        print("--- USER INPUT SESSION ---")
        print("Enter 'Q' at any prompt to quit the system.\n")

        # Step 1: Collect User Information (ID, Name, Book ID)
        member_id = input("Enter Member ID (e.g., M001 to M008): ").strip().upper()
        if member_id == 'Q':
            break

        name = input("Enter Member Name: ").strip()
        if name.upper() == 'Q':
            break

        book_id = input("Enter Book ID (e.g., B101 to B108): ").strip().upper()
        if book_id == 'Q':
            break

        # Step 2: Prompt for Action Choice (Borrow vs Return)
        print("\nSelect the action you want to perform:")
        print(" [1] Borrow Book")
        print(" [2] Return Book")
        action_choice = input("Enter choice (1 or 2): ").strip()

        # Step 3: Execute Scenarios based on Action Choice
        if action_choice == "1":
            # --- BORROW SCENARIO ---
            try:
                library.borrow_book(member_id=member_id, name=name, book_id=book_id)
            except LibraryError as e:
                print(f"\n[BORROW REJECTED] {e}")

        elif action_choice == "2":
            # --- RETURN SCENARIO ---
            days_input = input("Enter number of days overdue (Press Enter if 0): ").strip()
            days_overdue = int(days_input) if days_input.isdigit() else 0

            try:
                library.return_book(member_id=member_id, name=name, book_id=book_id, days_overdue=days_overdue)
            except LibraryError as e:
                print(f"\n[RETURN REJECTED] {e}")

        else:
            print("\n[INVALID CHOICE] Please select either 1 (Borrow) or 2 (Return).")

        # Step 4: Ask user if they wish to continue
        print("\n" + "-" * 50)
        cont = input("Perform another transaction? (Y/N): ").strip().lower()
        if cont != 'y':
            print("\nThank you for using the Library Management System. Goodbye!")
            break


if __name__ == "__main__":
    main()