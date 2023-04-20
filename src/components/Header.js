import React from 'react';
import Mission from './Mission';
import project from '../../package.json';

function Header() {
    const versionHover = `v${project.version}`;

    return (
        <header>
            <div className="header-container">
                <div>
                    <div className="logo-container">
                        <div className="adgLogo" />
                        <div>
                            <h1>ADGUARD</h1>
                            <h3 title={versionHover}>Automatic tests</h3>
                        </div>
                    </div>
                    <Mission />
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
                    <p>
                        If any specific product is selected,
                        some tests may be skipped due to the compatibility exceptions.
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;
