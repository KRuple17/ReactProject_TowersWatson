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
                  <input type="button" onClick={this.confirmDelete} value="Yes"/> 
                  <input type="button" onClick={this.cancelDelete} value="No"/> 
                 </div>
                );
    }
});