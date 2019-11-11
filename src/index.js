import users from "./users";
import devices from "./devices";
import projects from "./projects";
import "./styles.css";

const getUsersByProjectId = id => users.filter(elem => elem.projectId === id);
const getDevicesByProjectId = id =>
  devices.filter(elem => elem.projectId === id);

const generateUsersLayout = users =>
  users
    .map(
      user => `
<p data-app-user-id=${user.appuserId} data-project-id=${user.projectId}>${user.firstName} ${user.lastName}</p>`
    )
    .join("");

const generateDevicesLayout = devices =>
  devices
    .map(
      device => `
 <p data-device-id="${device.deviceId}" data-project-id="${device.projectId}">${device.serialNumber}</p>
`
    )
    .join("");

const generateProjectLayout = project => {
  const users = getUsersByProjectId(project.id);
  const devices = getDevicesByProjectId(project.id);

  return `
    <div class="wrapper">
        <p>${project.title}</p>
        ${generateUsersLayout(users)}
        ${generateDevicesLayout(devices)}
        ${project.beginDate ? "<p>" + project.beginDate + "</p>" : ""}
        ${project.expirationDate ? "<p>" + project.expirationDate + "</p>" : ""}
    </div>
    `;
};

const layout = projects.map(generateProjectLayout).join("");

document.body.insertAdjacentHTML("beforeend", layout);
