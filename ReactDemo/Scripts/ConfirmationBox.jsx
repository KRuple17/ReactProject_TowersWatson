var ConfirmationBox = React.createClass({
    confirmDelete: function()
    {
        this.props.confirmDelete();
    },
    cancelDelete: function()
    {
        this.props.cancelDelete();
    },
    render: function()
    {
        return (
                <div>
                 <label>Are you sure that you want to delete?</label>
                  <input className="btn btn-default" type="button" onClick={this.confirmDelete} value="Yes"/> 
                  <input className="btn btn-default" type="button" onClick={this.cancelDelete} value="No"/> 
                 </div>
                );
    }
});