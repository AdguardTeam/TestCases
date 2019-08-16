import React from 'react';

const Header = () => (
    <header>
        <div className="header-container">
            <div>
                <div className="logo-container">
                    <div className="adgLogo" />
                    <div>
                        <h1>ADGUARD</h1>
                        <h3>Automatic tests</h3>
                    </div>
                </div>
                <div className="mission">
                    This small website is supposed to assist AdGuard QA department in testing
                    different versions of AdGuard.
                    The task of testing content blocking was always the most complicated,
                    and this website aims to fix the situation, and make it as easy as possible.
                </div>
            </div>
            <div className="instruction">
                <h2>Testing instruction:</h2>
                <p>
                    It&lsquo;s important to disable all filter lists as
                    they may mess with the tests results.
                </p>
                <ul>
                    <li>Disable all filter lists.</li>
                    <li>
                        Add the filter list corresponding to the test
                        you&lsquo;re going to check.
                    </li>
                    <li>Enter the test page and refresh it.</li>
                    <li>If any tests doesn&lsquo;t pass, clear your browser cache.</li>
                </ul>
                <p>Expected result: all tests are marked as passed.</p>
            </div>
        </div>
    </header>
);

export default Header;
