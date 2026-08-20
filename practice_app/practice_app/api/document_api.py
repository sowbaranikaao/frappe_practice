import frappe
from frappe.query_builder import DocType


@frappe.whitelist()
def document_api_demo():

    todo = DocType("ToDo")
    user = DocType("User")

    query = (
        frappe.qb.from_(todo)
        .join(user)
        .on(todo.owner == user.name)
        .select(
            todo.name,
            todo.description,
            todo.owner,
            todo.priority,
            user.full_name,
        )
        .limit(10)
    )

    results = query.run(as_dict=True)

    if results:

        # Document API
        doc = frappe.get_doc("ToDo", results[0]["name"])
        doc.description = "Updated using Document API"
        doc.save()

        # Database API
        for record in results:
            frappe.db.set_value(
                "ToDo",
                record["name"],
                "priority",
                "Low",
            )

        frappe.db.commit()

    # Fetch fresh data after updates
    updated_results = query.run(as_dict=True)

    return updated_results