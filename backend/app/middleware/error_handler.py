from fastapi import Request
from fastapi.responses import JSONResponse
from pymongo.errors import PyMongoError

async def error_handler_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except PyMongoError as e:
        return JSONResponse(
            status_code=503,
            content={"status": "error", "message": "Database error", "detail": str(e)}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": "Internal server error", "detail": str(e)}
        ) 