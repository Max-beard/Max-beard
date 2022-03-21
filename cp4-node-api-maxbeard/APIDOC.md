# Beard API Documentation
The Beard API provides a collection of fun facts about myself and personal projects I have 
worked on.

## Get content on a project or topic I am interested in
**Request Format:** /content/:topic

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a json of data about the selected topic. Includes a name, description
and image

**Example Request:** /content/show

**Example Response:**
```json
{
  "name": "Attack on Titan",
  "description": "Anime where humanity has to fight against giant titans to survive",
  "image": "Attack_on_Titan.jpeg"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed an invalid topic name, returns error with the message: "I told you not to pick this one..."

## Get a fun fact
**Request Format:** /fun_fact

**Request Type:** GET

**Returned Data Format**: plain text

**Description:** Returns a text of a random fun fact about myself

**Example Request:** /fun_fact

**Example Response:**

```
My first name is actually Joseph
My favorite animal is an owl
...
```

**Error Handling:**
- N/A