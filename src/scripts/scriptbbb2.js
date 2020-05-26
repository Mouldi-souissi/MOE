// import Sha1 from "//rawcdn.githack.com/chrisveness/crypto/bafe342/sha1.js";
import * as sha from "./sha1";

export default function bbb(fullName, meetingID, password, secret) {
	// let s = "joinfullName=mouldi&meetingID=111&password=111&redirect=true";
	let s = "joinfullName=mouldi&meetingID=1&password=1&redirect=true";
	let sNoSecret = s
		.replace("1", meetingID)
		.replace("1", password)
		.replace("mouldi", fullName);

	s = sNoSecret.concat(secret);

	let y = sha.hex_sha1(s);

	let res = sNoSecret.replace("join", "").concat(`&checksum=${y}`);

	return res;
}
