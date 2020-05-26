// import Sha1 from "//rawcdn.githack.com/chrisveness/crypto/bafe342/sha1.js";
import * as sha from "./sha1";

export default function bbb(
	confId,
	confName,
	moderatorPass,
	attendeePass,
	secret
) {
	let s =
		"createname=Test&meetingID=abc123&attendeePW=111222&moderatorPW=333444";
	let sNoSecret = s
		.replace("Test", confName)
		.replace("abc123", confId)
		.replace("333444", moderatorPass)
		.replace("111222", attendeePass);
	s = sNoSecret.concat(secret);

	let y = sha.hex_sha1(s);

	let res = sNoSecret.replace("createname", "name").concat(`&checksum=${y}`);

	return res;
}
