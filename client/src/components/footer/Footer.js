import React from "react";

function Footer(){

    return(
        <footer className="footer-distributed">

			<div className="footer-left">

				<h3><span>Antique</span></h3>

				<p className="footer-links">
					Thank you for your visited.
				</p>

				<p className="footer-company-name"> © 2021</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>K82/63 Nguyen Luong Bang</span> Hoa Khanh Bac , Lien Chieu, Da Nang.</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>0848071200</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:phuocnghiaqs7@gmail.com">phuocnghiaqs7@gmail.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About the Team</span>
					This project was created to find all special things.<br/>
                    My crews:<br/>
                    Tran Dinh Phuoc Nghia.<br/>
                    Le Huu Long.<br/>
                    Phan Quang Hai Bang.<br/>
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