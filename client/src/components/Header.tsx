import { GetSession } from './GetSession';

export function Header() {
    return (
        <div>
            <h1>Zesty</h1>
            <h3>Recipe Costing and Management System</h3>
            <GetSession />
        </div>
    );
}
