from typing import Dict


# part 1 custom exception handling 

class LibraryError(Exception):
    """Base exception class for all custom domain errors in the library."""
    pass


class NotFoundError(LibraryError):
    """Raised when a specified Book ID or Member ID cannot be located."""
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


class DuplicateMemberError(LibraryError):
    """Raised when attempting to register a member with an ID that already exists."""
    pass


# part 2 Object oriented architechture


class Book:
    """
    Represents an individual book in the library system.
    Encapsulates book details and availability status.
    """

    def __init__(self, book_id: str, title: str, author: str):
        self.book_id: str = book_id
        self.title: str = title
        self.author: str = author
        self._is_available: bool = True  # Hidden attribute tracking availability

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
        """Restores book availability when returned."""
        self._is_available = True

    def __repr__(self) -> str:
        status = "Available" if self._is_available else "Borrowed"
        return f"Book(ID: {self.book_id}, Title: '{self.title}', Status: {status})"


class Member:
    """
    Represents a regular library member.
    Encapsulates member details and tracks currently borrowed books.
    """

    MAX_BORROW_LIMIT = 2  # Standard uniform borrowing limit for all members

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



# part 3 central library coordination


class Library:
    """
    Central manager storing books and members.
    Orchestrates borrowing, returning, and registration workflows.
    """

    def __init__(self):
        # Master dictionaries for quick O(1) lookups
        self.books: Dict[str, Book] = {}
        self.members: Dict[str, Member] = {}

    
    # registion and look-up method
    
    def add_book(self, book: Book) -> None:
        """Registers a new book entity in the library system."""
        self.books[book.book_id] = book

    def register_member(self, member: Member) -> None:
        """
        Registers a new member entity in the library system.
        Raises DuplicateMemberError if the Member ID already exists.
        """
        if member.member_id in self.members:
            raise DuplicateMemberError(f"Member ID '{member.member_id}' is already registered to '{self.members[member.member_id].name}'.")
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

    
    # Display and reporting help
    
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

    
    # core workflow: borrow process
    
    def borrow_book(self, member_id: str, book_id: str) -> None:
        """
        Executes a book borrowing request using Member ID and Book ID.
        """
        # Step 1: Lookup member by ID
        member = self.get_member(member_id)

        # Step 2: Lookup book by ID
        book = self.get_book(book_id)

        # Step 3 & 4: Update state (rolls back if limit reached)
        book.mark_borrowed()
        try:
            member.add_borrowed_book(book)
        except BorrowLimitReachedError:
            book.mark_returned()
            raise

        print(f"\n[SUCCESS] Book '{book.title}' (ID: {book_id}) borrowed successfully by {member.name}.")

    
    # core workflow returning process
    
    def return_book(self, member_id: str, book_id: str, days_overdue: int = 0, daily_fine_rate: float = 2.0) -> float:
        """
        Executes a book return request using Member ID and Book ID.
        """
        # Step 1: Lookup member by ID
        member = self.get_member(member_id)

        # Step 2: Lookup book by ID
        book = self.get_book(book_id)

        # Step 3: Remove book from active loans and restore availability
        returned_book = member.remove_borrowed_book(book_id)
        returned_book.mark_returned()

        # Step 4: Calculate fine if late
        fine_amount = 0.0
        if days_overdue > 0:
            fine_amount = days_overdue * daily_fine_rate
            print(f"\n[SUCCESS] Book '{book.title}' returned successfully by {member.name}.")
            print(f"--> LATE RETURN NOTICE: {days_overdue} day(s) overdue. Fine applied: ${fine_amount:.2f} (at ${daily_fine_rate:.2f}/day).")
        else:
            print(f"\n[SUCCESS] Book '{book.title}' returned on time by {member.name}.")

        return fine_amount



# part 4: data initialization and user interface


def seed_initial_data(library: Library) -> None:
    
    # Pre-populates the library system with realistic initial records.
    
    # 1. Register 8 Dummy Members
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
    library.borrow_book("M001", "B01")
    library.borrow_book("M001", "B02")
    library.borrow_book("M002", "B03")
    library.borrow_book("M003", "B04")


def main():
    """
    Interactive terminal application handling user inputs and options.
    """
    library = Library()
    seed_initial_data(library)

    print("\n==================================================")
    print("      WELCOME TO THE LIBRARY MANAGEMENT SYSTEM     ")
    print("==================================================")

    while True:
        # Display current system state
        library.display_system_status()

        print("--- MAIN MENU ---")
        print("Select an option:")
        print(" [1] Register New Member")
        print(" [2] Borrow Book")
        print(" [3] Return Book")
        print(" [Q] Quit System\n")

        choice = input("Enter option (1, 2, 3, or Q): ").strip().upper()

        if choice == 'Q':
            print("\nThank you for using the Library Management System. Goodbye!")
            break

        
        # OPTION 1: REGISTER NEW MEMBER
        
        elif choice == "1":
            print("\n--- NEW MEMBER REGISTRATION ---")
            new_id = input("Enter New Member ID (e.g., M009): ").strip().upper()
            if new_id == 'Q':
                break
            
            new_name = input("Enter Member Full Name: ").strip()
            if new_name.upper() == 'Q':
                break

            try:
                new_member = Member(member_id=new_id, name=new_name)
                library.register_member(new_member)
                print(f"\n[SUCCESS] Member '{new_name}' (ID: {new_id}) registered successfully!")
            except LibraryError as e:
                print(f"\n[REGISTRATION FAILED] {e}")

        
        # OPTION 2: BORROW BOOK
        
        elif choice == "2":
            print("\n--- BORROW A BOOK ---")
            member_id = input("Enter Member ID: ").strip().upper()
            if member_id == 'Q':
                break

            book_id = input("Enter Book ID: ").strip().upper()
            if book_id == 'Q':
                break

            try:
                library.borrow_book(member_id=member_id, book_id=book_id)
            except LibraryError as e:
                print(f"\n[BORROW REJECTED] {e}")

        
        # OPTION 3: RETURN BOOK
        
        elif choice == "3":
            print("\n--- RETURN A BOOK ---")
            member_id = input("Enter Member ID e.g M001: ").strip().upper()
            if member_id == 'Q':
                break

            book_id = input("Enter Book ID e.g B01: ").strip().upper()
            if book_id == 'Q':
                break

            days_input = input("Enter number of days overdue (Press Enter if 0): ").strip()
            days_overdue = int(days_input) if days_input.isdigit() else 0

            try:
                library.return_book(member_id=member_id, book_id=book_id, days_overdue=days_overdue)
            except LibraryError as e:
                print(f"\n[RETURN REJECTED] {e}")

        else:
            print("\n[INVALID OPTION] Please enter 1, 2, 3, or Q.")

        print("\n" + "-" * 50)
        cont = input("Perform another transaction? (Y/N): ").strip().lower()
        if cont != 'y':
            print("\nThank you for using the Library Management System. Goodbye!")
            break


main()