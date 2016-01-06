var middleNameRegex = /^[A-Z]?$/;
var nameRegex =/^[A-Z]{1}[a-z]$/;
var addressRegex = /^[0-9]+[a-zA-Z0-9 ]+$/

var CreateContactForm = React.createClass({
    getInitialState:function()
    {
        return({mInitialValid: true, firstNameValid:true, lastNameValid:true, addressValid:true});
    },
    validateInitial: function(event)
    {
        var text = event.target.value;
        console.log(text)
        if(!text.match(middleNameRegex))
        {
            this.setState({mInitialValid: false})
            alert('Please enter 1 Initial');
        }
        else{
            this.setState({mInitialValid: true})
            
        }
        return 0;
    },
   /* validateFirstName:function(event)
    {
        var text = event.target.value;
        console.log(text);
        if(!text.match(nameRegex))
        {
            alert('First names must contain at least 1 capital letter.');
            this.setState({firstNameValid: false});
        }
        else
        {
            this.setState({firstNameValid:true});
        }
    },
    validateLastName:function(event)
    {
        var text = event.target.value;

        if(!text.match(nameRegex))
        {
            alert('Last names must contain at least 1 capital letter.');
            this.setState({lastNameValid: false});
        }
        else
        {
            this.setState({lastNameValid: true});
        }
    },
    validateAddress:function(event)
    {
        var text = event.target.value;

        if(!text.match(addressRegex))
        {
            alert('An address must begin with at least 1 digit [0-9]');
            this.setState({addressValid:false});
        }
        else
        {
            this.setState({addressValid:false});
        }
    },*/
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
                    <input ref="fName" type="text" onChange={this.validateFirstName} name="firstNameBox" placeholder="FirstName"required/>
                    <input ref="lName" type="text" onChange={this.validateLastName} name="lastNameBox" placeholder="LastName"required/>
                    <input ref="mName" type="text" onChange={this.validateInitial} name="midNameBox" placeholder="Middle Initial(1)"required/>
                    <input ref="address" type="text" name="addressBox"placeholder="Address"/>
                    <input className="btn btn-default" type="button" name="submitButton" value="Create Contact" onClick={this.sumbitNew}/>
                    <input className="btn btn-default" type="button" name="cancelButton" value="Cancel Create" onClick={this.cancelNew}/>
                </form>
            </div>
            );
    }
});