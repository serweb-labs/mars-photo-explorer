import { HttpErrorResponse } from "@angular/common/http";
import { PermissionError, RetrievingError, UnavailableError, UnknownError } from "../../domain/errors";
import { NetworkError } from "../errors";

export class ToDomainErrorsMapper {

    static retrieve<T>(error: Error): Error {
        if (error instanceof NetworkError) {
            return new UnavailableError<T>();
        }
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 1:
                    return new UnavailableError<T>();
                case 400:
                case 429:
                    return new PermissionError<T>();
                case 500:
                    return new RetrievingError<T>();
            }
        }
        
        return new UnknownError<T>();
    }

}

