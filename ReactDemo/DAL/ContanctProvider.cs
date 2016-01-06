using ReactDemo.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ReactDemo.Models;
using System.Configuration;
using System.Data.SqlClient;

namespace ReactDemo.DAL
{
    public class ContactProvider : IAccountDb
    {
        private string dbConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["LocalAccountDb"].ConnectionString;

        public ContactProvider()
        {
        }

        //ID are auto-generated.
        public void createNewContact(Contact newContact)
        {
            using (SqlConnection dbConnection = new SqlConnection(dbConnectionString))
            {
                dbConnection.Open();

                String insertQuery = @"Insert INTO Contacts(FirstName, LastName, MiddleName, ContactAddress)
                                        Values(@fName, @lName, @mInitial, @address)";
                using (SqlCommand createContactCommand = new SqlCommand(insertQuery, dbConnection))
                {
                    createContactCommand.Parameters.AddWithValue("fName", newContact.FirstName);
                    createContactCommand.Parameters.AddWithValue("lName", newContact.LastName);
                    createContactCommand.Parameters.AddWithValue("mInitial", newContact.MiddleInitial);
                    createContactCommand.Parameters.AddWithValue("address", newContact.Address);

                    int rowsAffected = createContactCommand.ExecuteNonQuery();
                }
            }
        }

        public void deleteContact(int contactId)
        {
            using (SqlConnection dbConnection = new SqlConnection(dbConnectionString))
            {
                dbConnection.Open();
                String insertQuery = @"Delete From Contacts
                                       Where Id = @contactId";

                using (SqlCommand createContactCommand = new SqlCommand(insertQuery, dbConnection))
                {
                    createContactCommand.Parameters.AddWithValue("contactId", contactId);

                    int rowsAffected = createContactCommand.ExecuteNonQuery();
                }
            }
        }

        public IEnumerable<Contact> getAllContacts()
        {
            List<Contact> returnedContactList = null;
            using (SqlConnection dbConnection = new SqlConnection(dbConnectionString))
            {
                dbConnection.Open();
                String insertQuery = @"Select *
                                       From Contacts";

                SqlCommand readContactCommand = new SqlCommand(insertQuery, dbConnection);

                using (SqlDataReader dataReader = readContactCommand.ExecuteReader())
                {
                    if (dataReader.HasRows)
                    {
                        returnedContactList = new List<Contact>();
                        while (dataReader.Read())
                        {
                            int id = (int)dataReader["Id"];
                            string firstName = (string)dataReader["FirstName"];
                            string lastName = (string)dataReader["LastName"];
                            string mInitial = (string)dataReader["MiddleName"];
                            string address = (string)dataReader["ContactAddress"];

                            returnedContactList.Add(new Contact(id, firstName, lastName, mInitial, address));
                        }
                    }
                }
            }
            return returnedContactList;
        }

        public Contact readContact(int contactId)
        {
            Contact foundContact = null;
            using (SqlConnection dbConnection = new SqlConnection(dbConnectionString))
            {
                dbConnection.Open();
                String insertQuery = @"Select *
                                       From Contacts
                                       Where Id = @contactID";

                SqlCommand readContactCommand = new SqlCommand(insertQuery, dbConnection);
                readContactCommand.Parameters.AddWithValue("contactID", contactId);

                using (SqlDataReader dataReader = readContactCommand.ExecuteReader())
                {
                    if(dataReader.HasRows)
                    {
                        while(dataReader.Read())
                        {
                            int id = (int)dataReader["Id"];
                            string firstName = (string)dataReader["FirstName"];
                            string lastName = (string)dataReader["LastName"];
                            string mInitial = (string)dataReader["MiddleName"];
                            string address = (string)dataReader["ContactAddress"];

                            foundContact = new Contact(id, firstName, lastName, mInitial, address);
                        }
                    }
                }
            }
            return foundContact;
        }

        public void updateContact(Contact editedContact)
        {
            using (SqlConnection dbConnection = new SqlConnection(dbConnectionString))
            {
                dbConnection.Open();

                String insertQuery = @"Update Contacts
                                        Set FirstName = @fName, LastName = @lName,
                                            MiddleName = @mInitial, ContactAddress = @address
                                            Where Id = @contactID";
                using (SqlCommand createContactCommand = new SqlCommand(insertQuery, dbConnection))
                {
                    createContactCommand.Parameters.AddWithValue("contactID", editedContact.ContactID);
                    createContactCommand.Parameters.AddWithValue("fName", editedContact.FirstName);
                    createContactCommand.Parameters.AddWithValue("lName", editedContact.LastName);
                    createContactCommand.Parameters.AddWithValue("mInitial", editedContact.MiddleInitial);
                    createContactCommand.Parameters.AddWithValue("address", editedContact.Address);

                    int rowsAffected = createContactCommand.ExecuteNonQuery();
                }
            }
        }
    }
}