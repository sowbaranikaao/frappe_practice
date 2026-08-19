import frappe


def custom_todo_validate(doc, method=None):
    frappe.msgprint("Hook executed!")