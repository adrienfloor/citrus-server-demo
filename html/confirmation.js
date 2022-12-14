const confirmationHtml = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Sample Site</title>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
		<style>
			body {
				padding-top: 50px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="jumbotron">
				<h1>Citrus</h1>
				<h3>Thank you for verifying your email !</h3>
				<a href='citrus:'>You can now login in the app !</a>
			</div>
		</div>
	</body>
</html>`

module.exports.confirmationHtml = confirmationHtml