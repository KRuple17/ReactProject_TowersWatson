var ContactBox = React.createClass({
    getInitialState: function()
    {
        return {data: [], editedContact:null, showCreateForm:false, 
            showUpdateForm:false, showCreateButton: true};
    },
    loadDataFromServer: function()
    {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function()
        {
            var contactData = JSON.parse(xhr.responseText);
            this.setState({data: contactData});
        }.bind(this);
        xhr.send();
    },
    componentWillMount: function()
    {
        this.loadDataFromServer();
        // window.setInterval(this.loadDataFromServer, 5000); //Automatic Refreshing
    },
    enableUpdateForm: function(editedContact)
    {
        console.log('Click updateForm');
        this.setState({showUpdateForm: true, showCreateButton:false, editedContact: editedContact});
    },
    disableUpdateForm: function()
    {
        this.setState({showUpdateForm: false, showCreateButton:true});
    },
    enableCreateForm: function()
    {
        console.log('Got the Create click');
        this.setState({showCreateForm: true, showCreateButton:false});
    },
    disableCreateForm: function()
    {
        this.setState({showCreateForm: false, showCreateButton:true});
    },
    deleteRowPrompt:function()
    {
        console.log('Delete Row Prompt');
        this.setState({showCreateButton:false});
    },
    cancelDelete:function()
    {
        this.setState({showCreateButton:true});
    },
    handleEdit: function(contact)
    {
        if(!contact)
        {
            return;
        }
        var sendingData = new FormData();
        sendingData.append('ContactID', contact.ContactID);
        sendingData.append('FirstName', contact.FirstName);
        sendingData.append('LastName', contact.LastName);
        sendingData.append('MiddleInitial', contact.MiddleInitial);
        sendingData.append('Address', contact.Address);
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.updateUrl, true)
        xhr.onload = function()
        {
            this.loadDataFromServer();
            this.disableUpdateForm();
        }.bind(this);
        xhr.send(sendingData);
        console.log(contact);
        return 0;
    },
    submitNew: function(newContact)
    {
        if(!newContact)
        {
            return;
        }

        var sendingData = new FormData();
        sendingData.append('FirstName', newContact.FirstName);
        sendingData.append('LastName', newContact.LastName);
        sendingData.append('MiddleInitial', newContact.MiddleInitial);
        sendingData.append('Address', newContact.Address);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.addUrl, true)
        xhr.onload = function()
        {
            this.loadDataFromServer();
            this.disableCreateForm();
        }.bind(this);
        xhr.send(sendingData);
        console.log(newContact);
        return 0;
    },
    handleDelete:function(key)
    {
        if(!key)
        {
            alert("Key is undefined " + key);
            return;
        }

        var sendingData = new FormData();
        sendingData.append('ContactID',key);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.deleteUrl, true)
        xhr.onload = function()
        {
            this.loadDataFromServer();
            this.setState({showCreateButton: true});
        }.bind(this);
        xhr.send(sendingData);
        console.log(key);
        return 0;
    },
    render: function()
    {
        return (<div>
                    <ContactList data={this.state.data} enableUpdateForm={this.enableUpdateForm} deleteRowPrompt={this.deleteRowPrompt}
                     cancelDelete={this.cancelDelete} deleteRow={this.handleDelete} disableUpdateForm={this.disableUpdateForm} handleEdit={this.handleEdit}/>
                    {this.state.showCreateButton ? <input type="button" value="Create New" onClick={this.enableCreateForm}/> : null}
                    {this.state.showCreateForm ? <CreateContactForm submitNew={this.submitNew} cancelNew={this.disableCreateForm}/> : null}
                </div>);
    }
});

var ContactList = React.createClass({
    getInitialState: function()
    {
        return ({showUpdateForm: false, editedContact: null, keyToDelete: 0})
    },
    enableUpdateForm: function(editedContact)
    {
        this.props.enableUpdateForm();
        this.setState({showUpdateForm: true, editedContact: editedContact});
    },
    disableForm: function()
    {
        this.props.disableUpdateForm();
        this.setState({showUpdateForm: false});
    },
    handleEdit: function(editedContact)
    {
        this.props.handleEdit(editedContact);
        this.disableForm();
    },
    deleteRowPrompt:function(contactToDelete)
    {
        var key = contactToDelete.contactToDelete.ContactID;
        console.log('Delete '+ contactToDelete.contactToDelete.ContactID);
        this.props.deleteRowPrompt();
        this.setState({promptDelete: true, keyToDelete: key});
    },
    deleteRow:function()
    {
        //alert('Sending Key: ' + this.state.keyToDelete);
        this.props.deleteRow(this.state.keyToDelete);
        this.setState({promptDelete:false});
    },
    cancelDelete:function()
    {
        this.setState({promptDelete:false});
        this.props.cancelDelete();
    },
    render: function() 
    {
        var comments = this.props.data.map(function (contact)
        {
            return ( <Contact key={contact.ContactID} data={contact} firstName={contact.FirstName} lastName={contact.LastName} 
            deleteRowPrompt={this.deleteRowPrompt} address={contact.Address} midName={contact.MiddleInitial} enableUpdateForm={this.enableUpdateForm}/>);
        }, this);
            return (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    {this.state.showUpdateForm?  "Delete Row": "Name"}
                                </th>
                                <th>
                                    {this.state.showUpdateForm? null: "Address"}
                                </th>
                             </tr>
                        </thead>
                        <tbody>
                        {this.state.showUpdateForm ? <UpdateContactForm data={this.state.editedContact} submitChanges={this.handleEdit} cancelChanges={this.disableForm}/> 
                                                        : comments}
                        {this.state.promptDelete ? <ConfirmationBox deleteKey={this.state.key} confirmDelete={this.deleteRow} cancelDelete={this.cancelDelete}/> : null}
                        </tbody>
                    </table>
                    );
    }
});

var Contact = React.createClass({
    enableUpdateForm: function()
    {
        this.props.enableUpdateForm({editedContact: this.props.data});
    },
    deleteRow: function()
    {
        this.props.deleteRowPrompt({contactToDelete: this.props.data});
    },
    render: function() 
    {
    var fullName = this.props.firstName.trim()+ ", " + this.props.midName.trim() + " " + this.props.lastName.trim();
    return (
        <tr>
                <td><h4>{fullName}</h4></td>
                <td>{this.props.address}</td>
                <td><button onClick={this.enableUpdateForm} value ="Edit">Edit</button></td>
                <td><button onClick={this.deleteRow}>Delete</button></td>
        </tr>
            );
    }
});

ReactDOM.render(
    <ContactBox url="/Contacts" addUrl="/AddContact"
    updateUrl="/UpdateContact" deleteUrl="/DeleteContact"/>,
document.getElementById('content'));