var React = require('react');

class Home extends React.Component {
	render() {
		return (
				<form method="POST" action="/pokemon">
					<p>
						Id: <input type="text" name="id"/>
						<br/>
						num: <input type="text" name="num"/>
						<br/>
						Name: <input type="text" name="name"/>
						<br/>
						Image: <input type="text" name="img"/>
						<br/>
						Height: <input type="text" name="height"/>
						<br/>
						Weight: <input type="text" name="weight"/>
						<br/>
						<input type="submit"/>
					</p>
				</form>
		);
	}
}

module.exports = Home;