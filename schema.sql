CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default" NOT NULL DEFAULT 'Teacher'::text,
    phone text COLLATE pg_catalog."default",
    department text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)


CREATE TABLE IF NOT EXISTS public.student
(
    roll_number integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    admission_session integer NOT NULL,
    current_semester integer NOT NULL,
    current_session integer NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY (roll_number)
)

CREATE TABLE IF NOT EXISTS public.courses
(
    course_code text COLLATE pg_catalog."default" NOT NULL,
    course_name text COLLATE pg_catalog."default" NOT NULL,
    course_credit smallint NOT NULL,
    course_type text COLLATE pg_catalog."default" NOT NULL,
    semester smallint NOT NULL,
    CONSTRAINT courses_pkey PRIMARY KEY (course_code)
)




CREATE TABLE IF NOT EXISTS public.exam_committee
(
    id uuid NOT NULL,
    semester integer NOT NULL,
    exam_session integer NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL DEFAULT 'Member'::text,
    published boolean NOT NULL DEFAULT false,
    publish_date date,
    CONSTRAINT exam_committee_pkey PRIMARY KEY (id, semester, exam_session),
    CONSTRAINT unq_sem_session UNIQUE (id, semester, exam_session),
    CONSTRAINT com_ref_user_fk FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)


CREATE OR REPLACE FUNCTION public.insert_into_sem_course(
	sem integer,
	sess integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	code VARCHAR;
BEGIN
	FOR code IN SELECT course_code FROM courses WHERE semester = sem
LOOP
	INSERT INTO sem_course VALUES(code, sess);
END LOOP;
END;
$BODY$;

ALTER FUNCTION public.insert_into_sem_course(integer, integer)
    OWNER TO admin;


CREATE TABLE IF NOT EXISTS public.sem_course
(
    course_code text COLLATE pg_catalog."default" NOT NULL,
    exam_session integer NOT NULL,
    assigned boolean NOT NULL DEFAULT false,
    submitted boolean NOT NULL DEFAULT false,
    decoded boolean NOT NULL DEFAULT false,
    examiners text[] COLLATE pg_catalog."default",
    CONSTRAINT sem_cour_unq PRIMARY KEY (course_code, exam_session),
    CONSTRAINT sem_cour_code FOREIGN KEY (course_code)
        REFERENCES public.courses (course_code) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sem_course
    OWNER to admin;






-- Table: public.examiner

-- DROP TABLE IF EXISTS public.examiner;

CREATE TABLE IF NOT EXISTS public.examiner
(
    id uuid NOT NULL,
    exam_session integer NOT NULL,
    course_code text COLLATE pg_catalog."default" NOT NULL,
    set text COLLATE pg_catalog."default" NOT NULL,
    submitted boolean NOT NULL DEFAULT false,
    submit_date date,
    decoded boolean NOT NULL DEFAULT false,
    decode_date date,
    CONSTRAINT examiner_pkey PRIMARY KEY (id),
    CONSTRAINT examnr_unq UNIQUE (id, exam_session, course_code, set),
    CONSTRAINT exmnr_courses_code FOREIGN KEY (course_code)
        REFERENCES public.courses (course_code) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT exmnr_users_id FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;


ALTER TABLE IF EXISTS public.examiner
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.topsheet
(
    exam_session integer NOT NULL,
    course_code text COLLATE pg_catalog."default" NOT NULL,
    set text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    code integer NOT NULL,
    CONSTRAINT topsheet_pkey PRIMARY KEY (exam_session, course_code, set, type, code),
    CONSTRAINT topsheet_course_code_fkey FOREIGN KEY (course_code)
        REFERENCES public.courses (course_code) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)