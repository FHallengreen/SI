from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class Spacecraft(BaseModel):
    id: int
    name: str


spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Enterprise"),
]


@router.get("/api/spacecrafts", tags=["spacecraft"], response_model=list[Spacecraft])
async def get_spacecrafts():
    return spacecrafts


@router.get(
    "/api/spacecrafts/{spacecraft_id}", tags=["spacecraft"], response_model=Spacecraft)
def get_spacecraft_by_id(spacecraft_id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == spacecraft.id:
            return spacecraft
    raise HTTPException(status_code=404, detail="Spacecraft not found")
        
