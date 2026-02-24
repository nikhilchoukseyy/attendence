# API Contract (v1)

Base URL: `/api/v1`

Authentication: `Authorization: Bearer <jwt>` for protected routes.

## 1) Register

`POST /auth/register`

### Request

```json
{
  "name": "Asha Patel",
  "email": "asha@example.edu",
  "password": "StrongPass#123",
  "role": "student",
  "device_id": "a5e2ea2d-0f7c-4bb5-b983-f0db2f2f5c55"
}
```

### Success: 201

```json
{
  "message": "Registered successfully",
  "user": {
    "id": "...",
    "name": "Asha Patel",
    "email": "asha@example.edu",
    "role": "student"
  }
}
```

## 2) Login

`POST /auth/login`

### Request

```json
{
  "email": "asha@example.edu",
  "password": "StrongPass#123",
  "device_id": "a5e2ea2d-0f7c-4bb5-b983-f0db2f2f5c55"
}
```

### Success: 200

```json
{
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Asha Patel",
    "role": "student"
  }
}
```

### Validation rules

- If user has no `device_id` yet, bind on first successful login.
- If incoming `device_id` differs from stored value, return `403 DEVICE_MISMATCH`.

## 3) Start Session (Teacher only)

`POST /session/start`

### Request

```json
{
  "router_ip": "192.168.1.1",
  "duration_minutes": 5
}
```

### Success: 201

```json
{
  "session": {
    "id": "...",
    "teacher_id": "...",
    "router_ip": "192.168.1.1",
    "start_time": "2026-01-01T10:00:00.000Z",
    "end_time": "2026-01-01T10:05:00.000Z",
    "active": true
  }
}
```

## 4) Get Active Session

`GET /session/active`

### Success: 200

```json
{
  "session": {
    "id": "...",
    "router_ip": "192.168.1.1",
    "start_time": "...",
    "end_time": "...",
    "active": true
  }
}
```

### Notes

- Server should auto-expire stale sessions before returning data.

## 5) Mark Attendance (Student only)

`POST /attendance/mark`

### Request

```json
{
  "session_id": "...",
  "device_id": "a5e2ea2d-0f7c-4bb5-b983-f0db2f2f5c55",
  "device_ip": "192.168.1.52",
  "gateway_ip": "192.168.1.1"
}
```

### Backend validation order

1. JWT validity + role check (`student`).
2. Session exists.
3. Session time window is still open (`now <= end_time`).
4. Session marked active (or auto-close then reject).
5. Device binding matches user profile.
6. Gateway IP equals session router IP.
7. Device IP belongs to router subnet.
8. Duplicate guard (`student_id + session_id` unique).

### Success: 201

```json
{
  "message": "Attendance marked",
  "attendance": {
    "id": "...",
    "student_id": "...",
    "session_id": "...",
    "marked_at": "..."
  }
}
```

## 6) Session Attendance (Teacher only)

`GET /attendance/session/:id`

### Success: 200

```json
{
  "session_id": "...",
  "count": 42,
  "records": [
    {
      "student_id": "...",
      "name": "Asha Patel",
      "marked_at": "...",
      "device_ip": "192.168.1.52"
    }
  ]
}
```

## Error format

```json
{
  "error": {
    "code": "DEVICE_MISMATCH",
    "message": "Device verification failed"
  }
}
```

Recommended error codes:

- `UNAUTHORIZED`
- `FORBIDDEN`
- `DEVICE_MISMATCH`
- `SESSION_EXPIRED`
- `SESSION_NOT_ACTIVE`
- `DUPLICATE_ATTENDANCE`
- `INVALID_NETWORK`
- `VALIDATION_ERROR`
