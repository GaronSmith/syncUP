# syncUP
[[Image]]

[![Contributors](https://img.shields.io/github/contributors/GaronSmith/syncUP)](https://www.github.com/GaronSmith/syncUP/contributors)
[![Open Issues](https://img.shields.io/github/issues/GaronSmith/syncUP)](https://www.github.com/GaronSmith/syncUP/issues)
[![Forks](https://img.shields.io/github/forks/GaronSmith/syncUP)](https://www.github.com/GaronSmith/syncUP/forks)
[![Stars](https://img.shields.io/github/stars/GaronSmith/syncUP)](https://www.github.com/GaronSmith/syncUP/stars)

## What is syncUP?
[syncUP](https://syncup.herokuapp.com) is social media platform focused on themed groups and event planning inspired by [Meetup](https://www.meetup.com/).

## Developing
### Backend
1. `git clone` this repository
2. `cd` into the local repository
3. Install python dependencies: `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
4. Create a .env file based on our example
5. Shell into the python env: `pipenv shell`
6. Apply database migrations: `flask db upgrade`
7. Seed database: `flask seed all`
8. Run backend: `flask run`

### Frontend
1. `git clone` this repository if you haven't already
2. `cd` into the local repository
3. `cd` into `/react-app`
4. `npm install` the front end dependencies
5. Run the front end: `npm start`

*Note: By default the back end will be running on port 5000, and the front end will be running on port 3000.*

## Base Languages
* JavaScript
* python
* CSS
* HTML 5
* SQL

## Technology Used
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/)
* [Amazon Web Services S3](https://aws.amazon.com/s3/)
* [Docker](https://www.docker.com/)
* [Heroku](https://heroku.com/)

## Links
* [Live Application](https://syncUP.herokuapp.com)
* [Application Wiki](https://github.com/GaronSmith/syncUP/wiki)

## Challenges
Some of the challenges we faced in the development of syncUp include the following:
* During the development of an Event Page, we needed to conditionally render buttons based on the permission level of the user accessing the page. Using boolean logic and React state management we wrote mutually exclusive scenarios that allow the owner of a Group or the organizer of an Event to edit or delete the event. It also allowed for other users to attend an event if they are part of a group, show a notification to join the group before being able to attend, and leave an event they are already attending.
* AWS S3 implementation varies according to the approach and technologies being used in the front- and back-end. Early on in the project we dedicated our effort to adapting the Express backend implementation we had previously worked with, to the Flask backend environment we used for syncUP.

## Code Highlights
### Search Functionality
PLACEHOLDER FOR DESCRIPTION
```javascript
"PLACEHOLDER"
```
### User Profile
Modular updatable user profile inputs
```javascript
function ProfileBox({label, content, userFile}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let user = useSelector(state => state.user)
  let [buttonText, setButtonText] = useState('Edit');
  let [value, setValue] = useState(content);
  let [formDisabled, setFormDisabled] = useState(true);
  let [imageFile, setImageFile] = useState(null)

  const initialValue = content;

  useEffect(() => {
    setValue(content)
  }, [content])

  const buttonClick = () => {
    const imgButton = document.getElementById('imageButton');
    //The editor is not active
    if(formDisabled) {
      setFormDisabled(false);
      if(userFile) {
        imgButton.disabled = false;
      }
      setButtonText('Confirm');
    } else {
      //The editor is active - Dispatch a thunk to mutate the database
      setFormDisabled(true);
      setButtonText('Edit');
      if(userFile) {
        imgButton.disabled = true;
      }
      if(value === initialValue) return;
      dispatch(editUser(user.id, label, value))
    }
  }

  const userFileSubmit = (e) => {
    setImageFile(e.target.files[0]);
  }

  //Check if image file changed - If so, upload to S3
  useEffect(() => {
    async function fetchUrl() {
      const imgUrl = await dispatch(uploadUserImage(imageFile))
      setValue(imgUrl);
    }
    if(imageFile)
      fetchUrl();

  },[imageFile, dispatch])

  function userFileButton() {
    return (
    <>
      <span> </span>
      <input
        type='file'
        onChange={userFileSubmit}
        name='imageFile'
        id='imageButton'
      />
    </>
    );
  };

  return (
    <>
      <input class='profile__field' type='text' value={value} disabled={formDisabled} onChange={e => setValue(e.target.value)}/>
      { id === 'me' &&
      <>
      <span> </span>
      <input type='button' value={buttonText} onClick={buttonClick}/>
      {userFile && userFileButton()}
      </>}
    </>
  );
};
```
