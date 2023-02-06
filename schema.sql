CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT 'uuid_generate_v4()',
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default" NOT NULL,
    phone text COLLATE pg_catalog."default",
    faculty text COLLATE pg_catalog."default",
    department text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.course
(
    course_code integer NOT NULL,
    course_name text COLLATE pg_catalog."default" NOT NULL,
    course_credit integer NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    semester integer NOT NULL,
    CONSTRAINT course_pkey PRIMARY KEY (course_code)
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

CREATE TABLE IF NOT EXISTS public.exam_committee
(
    id uuid NOT NULL,
    semester integer NOT NULL,
    exam_session bigint NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT exam_committee_pkey PRIMARY KEY (id, semester, exam_session),
    CONSTRAINT com_ref_user_fk FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

