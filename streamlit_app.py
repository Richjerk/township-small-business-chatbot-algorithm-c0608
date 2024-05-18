import streamlit as st
from pymongo import MongoClient

# Connect to MongoDB Atlas
client = MongoClient("mongodb+srv://<username>:<password>@cluster0.mongodb.net/township_db?retryWrites=true&w=majority")
db = client.township_db
collection = db.businesses

# Streamlit app layout
st.title("Township Small Business Chatbot")

def add_business():
    name = st.text_input("Enter Business Name")
    type = st.text_input("Enter Business Type")
    address = st.text_input("Enter Business Address")
    if st.button("Add Business"):
        collection.insert_one({"name": name, "type": type, "address": address})
        st.success("Business added successfully!")

def view_businesses():
    businesses = collection.find()
    for business in businesses:
        st.write(business)

def update_business():
    name = st.text_input("Enter Business Name to Update")
    new_type = st.text_input("Enter New Business Type")
    new_address = st.text_input("Enter New Business Address")
    if st.button("Update Business"):
        collection.update_one({"name": name}, {"$set": {"type": new_type, "address": new_address}})
        st.success("Business updated successfully!")

def delete_business():
    name = st.text_input("Enter Business Name to Delete")
    if st.button("Delete Business"):
        collection.delete_one({"name": name})
        st.success("Business deleted successfully!")

# Main app function
def main():
    st.sidebar.title("Menu")
    menu = ["Add Business", "View Businesses", "Update Business", "Delete Business"]
    choice = st.sidebar.selectbox("Select Activity", menu)

    if choice == "Add Business":
        add_business()
    elif choice == "View Businesses":
        view_businesses()
    elif choice == "Update Business":
        update_business()
    elif choice == "Delete Business":
        delete_business()

if __name__ == "__main__":
    main()
