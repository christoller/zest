import { Copyright } from './Copyright';

export function Footer() {
    return (
        <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
            <Copyright />
        </div>
    );
}
