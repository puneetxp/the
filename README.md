# The Framework cum Start Pack 

Roadmap to compile in multiple Languages
Roadmap to be decide.

First Step 

Go to /App/Karl/setup/model/ where is json you can create new json file accordingly


{
    "name": "user",//MODEL NAME
    "table": "users",//TABLE NAME
    "crud": ["c", "r", "u","d"],//CREATE UPDATE READ DELETE
    "data": [{
            "name": "password",//name of database
            "mysql_data": "varchar(255)",//mysql database
            "sql_attribute": "NULL",//mysql sql_attribute you can NOT NULL is defullt if there is no sql_attribute then it is NOT NULL
            "datatype": "string"//for interface file
        }],
    "roles": {
        "read": ["admin"],//roles allow to read
        "update": ["admin"],//roles allow to update
        "write": ["admin"],//roles allow to write
        "delete": ["-"]//roles allow to delete
    }
}
