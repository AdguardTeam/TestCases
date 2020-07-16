import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear().toString();

    return (
        <footer>
            <div className="footer-logo">
                <div className="copyrights">
                    &copy; AdGuard, 2009–
                    {currentYear}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
