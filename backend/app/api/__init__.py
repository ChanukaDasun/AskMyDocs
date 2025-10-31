from fastapi import APIRouter
from app.api.routes import test, files

router = APIRouter()
router.include_router(test.router, prefix="/test")
router.include_router(files.router, prefix="/files")
