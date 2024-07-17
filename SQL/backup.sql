CREATE TABLE sections (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT(30),
	url TEXT(30),
	description TEXT(100)
);

-- subsections definition

CREATE TABLE subsections (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	section_id INTEGER NOT NULL,
	name TEXT(30),
	url TEXT(30),
	description TEXT(100)
);

-- topics definition

CREATE TABLE topics (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	subsection_id INTEGER NOT NULL,
	name TEXT(30)
);


-- file_upload definition

CREATE TABLE file_upload (
	id INTEGER NOT NULL,
	"month" TEXT,
	date TEXT,
	qtty REAL
);


INSERT INTO sections (name,url,description) VALUES
	 ('math and stuff','/math','Math stuff separated by topic. Lets see the edit section'),
	 ('online learning','/courses','Notes from the courses I am taking online to learn.'),
	 ('Programming','/programming','Coding notes and stuff'),
	 ('Personal notes','/personal','Personal notes written for different purposes'),
	 ('My Lectures','/lectures','My personal lectures. This courses correspond to those teached@TecDeMonterrey and Online');


INSERT INTO subsections (section_id,name,url,description) VALUES
	 (1,'Algebra','/algebra','Some notes about classic algebra'),
	 (1,'Calculus','/calculus','Wanna know about Calculus?'),
	 (1,'Linear Algebra','/linear','Linear Algebra stuff'),
	 (1,'Statistics','/stat','Statistic and probability'),
	 (2,'DS Bootcamp','/dsBoot','Data science udemy bootcam'),
	 (2,'Web Programming BC','/webProg','Angela''s web programming bootcamp'),
	 (3,'Nodejs','/node','Few notes about JS, like async/await'),
	 (3,'Python','/python','Python notes here'),
	 (5,'IoT','/iot','IoT class given @Tec de Monterrey'),
	 (5,'Software Development','/software','Programming class given @Tec de Monterrey');
INSERT INTO subsections (section_id,name,url,description) VALUES
	 (5,'Tech Evaluation','/tech','Macedonio''s stuff'),
	 (5,'Data Governance','/mlCourse','ML and AI here!'),
	 (5,'Python for business','/pythonLect','New Lecture asigned by the Computer Science Department'),
	 (4,'Daily Writing','/daily','Here I write everyday about somethig');


INSERT INTO topics (subsection_id,name) VALUES
	 (14,'July 11 2024');

