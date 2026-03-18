from typing import Dict, List, Any
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # Store connections by user ID
        # {user_id: {"websocket": WebSocket, "role": "admin" | "student"}}
        self.active_connections: Dict[int, List[Dict[str, Any]]] = {}

    async def connect(self, websocket: WebSocket, user_id: int, role: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append({"websocket": websocket, "role": role})

    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id] = [
                conn for conn in self.active_connections[user_id] 
                if conn["websocket"] != websocket
            ]
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            # Send to all connections of this user (multiple tabs)
            for connection in self.active_connections[user_id]:
                try:
                    await connection["websocket"].send_json(message)
                except Exception:
                    pass # Handle disconnected sockets gracefully

    async def broadcast_to_role(self, message: dict, role: str):
        for user_id, connections in self.active_connections.items():
            for connection in connections:
                if connection.get("role") == role:
                    try:
                        await connection["websocket"].send_json(message)
                    except Exception:
                        pass # Handle disconnected sockets gracefully

manager = ConnectionManager()
