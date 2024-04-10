import React,{ useState } from 'react' ;


const Register = ({onRouteChange, loadUser}) => {
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const onNameChange = (event) => {
		setRegisterName(event.target.value);
	}
	const onEmailChange = (event) => {
		setRegisterEmail(event.target.value);
	}

	const onPasswordChange = (event) => {
		setRegisterPassword(event.target.value);
	}

	const onRegisterSubmit = () => {
		fetch(`${process.env.REACT_APP_BASE_URL}/register`,{
			method : 'post',
			headers : { 'Content-type': 'application/json'},
			body : JSON.stringify({
				name: registerName,
				email : registerEmail,
				password: registerPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user){
				loadUser(user);
				onRouteChange("home");
			}
		})
	}

	return(
		<article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
			<main className="pa4 black-80">
				<div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				    <legend className="f2 fw6 ph0 mh0">Register</legend>
				    <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange = {onNameChange} />
				    </div>
				    <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange = {onEmailChange} />
				    </div>
				    <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange = {onPasswordChange}/>
				    </div>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={onRegisterSubmit}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register" 
				      />
				    </div>
				    <div className="lh-copy mt3">
				    	<p 
				    	onClick={() => onRouteChange("signin")} 
				    	className="f6 link dim black db pointer">
				    	Already have an account? Sign In
				    	</p>
				    </div>
				</div>
			</main>
		</article>
		);
}

export default Register;

