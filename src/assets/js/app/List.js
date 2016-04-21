var List = React.createClass({
  render: function() {
    var array = ['item','item2'];

    return (
      <ul>
        {array.map(function(listValue, index){
          return <li key={index}>{listValue}</li>;
        })}
      </ul>
    );
  }
});

module.exports = List;