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

class BookUnavailableErro(Library):
    # raise exception when there will be no book available
    pass

class BorrowLimitRearchedError(Library):
    # raise exception when there will be borrow limit reached
    pass

class InvalidReturnError(Library):
    # raise exception when any member try to return the book they currenly doesn't hold.
    pass



