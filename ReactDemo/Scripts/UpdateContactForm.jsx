var UpdateContactForm = React.createClass({
    getInitialState: function()
    {
        return{contactKey: this.props.data.editedContact.ContactID}
    },
    clearFields: function(){
        this.refs.fName.value = '';
        this.refs.lName.value = '';
        this.refs.mName.value = '';
        this.refs.address.value = '';
        return 0;
    },
    componentDidMount: function()
    {
        this.refs.fName.value = this.props.data.editedContact.FirstName.trim();
        this.refs.lName.value = this.props.data.editedContact.LastName.trim();
        this.refs.mName.value = this.props.data.editedContact.MiddleInitial.trim();
        this.refs.address.value = this.props.data.editedContact.Address.trim();
    },
    sumbitChages: function()
    {
        console.log("ID! " + this.state.contactKey);

        this.props.submitChanges({
            ContactID: this.state.contactKey,
            FirstName: this.refs.fName.value.trim(),
            LastName: this.refs.lName.value.trim(),
            MiddleInitial:this.refs.mName.value.trim(),
            Address: this.refs.address.value.trim()
        });
        this.clearFields();
    },
    cancelChanges: function()
    {
        this.props.cancelChanges();
    },
    render: function()
    {
        return (
            <div>
                <form name="updateContactForm">
                    <input ref="fName" type="text" name="firstNameBox"/>
                    <input ref="lName" type="text" name="lastNameBox" />
                    <input ref="mName" type="text" name="midNameBox" />
                    <input ref="address" type="text" name="addressBox"/>
                    <input type="button" name="submitButton" value="Save Changes" onClick={this.sumbitChages}/>
                    <input type="button" name="cancelButton" value="Cancel Changes" onClick={this.cancelChanges}/>
                </form>
            </div>
            );
    }
});