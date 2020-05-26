import { $ } from "jquery";

export default function toggle() {
	$("#menu-toggle").click(function (e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
}
