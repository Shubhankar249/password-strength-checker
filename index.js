const strengthMeter=document.getElementById('strength-meter');
const passInput=document.getElementById('password-input');
const reasons=document.getElementById('reasons');

passInput.addEventListener('input', ()=> {
    const weakness=calculateStrength(passInput.value);
    let strength=100;

    reasons.innerHTML="";
    weakness.forEach(weak=> {
        if (!weak)  return;
        strength-=weak.deduction;
        const msg=document.createElement('div');
        msg.innerText=weak.message;
        reasons.appendChild(msg);
    });
    strengthMeter.style.setProperty('--strength', strength);
});


function calculateStrength (pass) {
    const weakness=[];
    weakness.push(lengthWeakness(pass));
    weakness.push(charsWeakness(pass, /[a-z]/g, 'lowercase letters'));
    weakness.push(charsWeakness(pass, /[A-Z]/g, 'uppercase letters'));
    weakness.push(charsWeakness(pass, /[0-9]/g, 'numbers'));
    weakness.push(repeatCheck(pass));
    return weakness;
}

function lengthWeakness(pass) {
    const len=pass.length;

    if (len<4) return ({
       message: "It's not a pin dumbass!",
       deduction: 80
    });

    if (len<=5) return{
        message:"Your pass is too short",
        deduction:40
    };
    if (len>10) return {
        message: "Its too long to remember",
        deduction: 20
    };
}

function charsWeakness(pass, regex, type) {
    const matches= pass.match(regex) || [];
    if (matches.length<1) {
        return{
            message:`It should contain atleast 1 ${type}`,
            deduction: 45
        }
    }

    if (matches.length<3) {
        return {
            message: `It could be stronger insert more ${type}`,
            deduction: 15
        }
    }
}

function repeatCheck(pass) {
    const matches=pass.match(/(.)\1/g) || [];

    if (matches.length>0) {
        return{
            message: "Please don't repeat value",
            deduction:30
        }
    }
}

