from fastapi import APIRouter

from app.api.v1.endpoints import users, products, orders, auth, services

api_router = APIRouter()

# Маршруты будут добавляться по мере разработки
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(products.router, prefix="/products", tags=["products"])
# api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
# api_router.include_router(services.router, prefix="/services", tags=["services"]) 