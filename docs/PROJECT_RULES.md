# 🔒 Project Rules (STRICT - MUST FOLLOW)

## 1. API Rules

* All APIs must start with /api/v1
* All responses must follow:
  { success: boolean, data: any, message?: string }
* Use proper HTTP status codes

## 2. Validation Rules

* Use Zod for ALL request validation
* No direct req.body usage without validation

## 3. Architecture Rules

* Controller = only request/response
* Service = business logic
* No business logic inside controller

## 4. Database Rules

* Use Date type (not string)
* Prevent duplicate records using indexes
* Always store createdAt, updatedAt

## 5. Error Handling

* Use global error middleware
* No try-catch in every controller (use wrapper)

## 6. Naming Rules

* feature-based folders only
* no random files outside modules

## 7. AI Instruction Rule

* If any code violates above rules → REJECT and FIX
