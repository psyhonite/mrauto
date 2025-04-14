from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core import security
from app.api import deps
# from app.schemas.token import Token
# from app.services.user import authenticate

router = APIRouter()

@router.post("/login") #, response_model=Token)
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    Получение токена доступа OAuth2 для аутентифицированного пользователя
    """
    # Раскомментировать, когда будет реализована модель пользователя и аутентификация
    # user = authenticate(
    #     email=form_data.username,
    #     password=form_data.password,
    # )
    # if not user:
    #     raise HTTPException(status_code=400, detail="Неверный email или пароль")
    # elif not user.is_active:
    #     raise HTTPException(status_code=400, detail="Неактивный пользователь")
    # access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    # return {
    #     "access_token": security.create_access_token(
    #         user.id, expires_delta=access_token_expires
    #     ),
    #     "token_type": "bearer",
    # }
    
    # Временная заглушка
    return {"access_token": "temp_token", "token_type": "bearer"} 