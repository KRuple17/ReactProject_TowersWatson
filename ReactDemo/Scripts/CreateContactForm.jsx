var CreateContactForm = React.createClass({
    getInitialState:function()
    {
        return({mInitialValid: true});
    },
    validate: function(event)
    {
        var text = event.target.value;
        var regex = /^[A-Z]?$/;
        if(!text.match(regex))
        {
            this.setState({mInitialValid: false})
            alert("Single capital letters only.");
        }
        return 0;
    },
    sumbitNew: function()
    {
        console.log('Click from CreateForm!')
        this.props.submitNew({
            FirstName: this.refs.fName.value.trim(),
            LastName: this.refs.lName.value.trim(),
            MiddleInitial:this.refs.mName.value.trim(),
            Address: this.refs.address.value.trim()
        });
    },
    cancelNew: function()
    {
        this.props.cancelNew();
    },
    render: function()
    {
        return (
            <div>
                <form ref="form" name="createContactForm">
                    <input ref="fName" type="text" name="firstNameBox" placeholder="FirstName"/>
                    <input ref="lName" type="text" name="lastNameBox" placeholder="LastName"/>
                    <input ref="mName" type="text" onChange={this.validate} pattern="[A-Z]{1}" name="midNameBox" placeholder="Middle Initial(1)"/>
                    <input ref="address" type="text" name="addressBox"placeholder="Address"/>
                    <input type="button" name="submitButton" value="Create Contact" onClick={this.sumbitNew}/>
                    <input type="button" name="cancelButton" value="Cancel Create" onClick={this.cancelNew}/>
                </form>
            </div>
            );
    }
});