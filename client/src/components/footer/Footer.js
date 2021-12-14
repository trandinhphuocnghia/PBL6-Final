import React from "react";

function Footer(){

    return(
        <footer className="footer-distributed">

			<div className="footer-left">

				<h3><span>GIOCATTOLI</span></h3>

				<p className="footer-links">
					Thank you for your visited.
				</p>

				<p className="footer-company-name"> © 2021</p>
			</div>

			<div className="footer-center">
				<h3><span>ADDRESS</span></h3>
				<div>
					<p>K82/63 Nguyen Luong Bang, Hoa Khanh Bac , Lien Chieu, Da Nang.</p>
				</div>

				<div>
					<p>0848071200</p>
				</div>

				<div>
					<p><a href="mailto:phuocnghiaqs7@gmail.com">phuocnghiaqs7@gmail.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About the Team</span>
					This project was created to find all special things.<br/>
                    My crews:<br/>
                    Tran Dinh Phuoc Nghia.<br/>
                   	Nguyen Le Tuan Cuong.<br/>
                    Dang Quang Huy.<br/>
				</p>

				<div className="footer-icons">

					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
    )
}

export default Footer