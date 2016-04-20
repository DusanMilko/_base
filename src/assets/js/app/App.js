var App = React.createClass({
	render: function() {
		return (
			<h1>Hello World!</h1>
		);
	}
});
	
module.exports = App;

ReactDOM.render(<App/>, document.getElementById('App'));