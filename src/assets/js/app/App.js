var App = React.createClass({
	getInitialState: function() {
    	return {
    		count: 0
    	};
  	},
  	getDefaultProps: function() {
		return {
			greeting: "Hello",
			img: "http://placehold.it/100x100"
		};
	},
	add: function() {
		this.setState({
			count: this.state.count + 1
		});
	},
	subtract: function() {
		this.setState({
			count: this.state.count - 1
		});
	},
	render: function() {
		return (
			<div>
				<h1>{this.props.greeting} World!</h1>
				<List />
				<img src={this.props.img} />
				<div>
					{this.state.count}
					<button onClick={this.add}>Add</button>
					<button onClick={this.subtract}>Subtract</button>
				</div>
			</div>
		);
	}
});
	
module.exports = App;

ReactDOM.render(<App img="http://placehold.it/100x100/cba" />, document.getElementById('App'));