'use strict';

const Job = use('App/Models/Job');


class JobController {

  async home({view}) {



    // // Create a job
    // const job = new Job;
    // job.title = ' My job title';
    // job.link = 'http://google.com';
    // job.description = 'My job description';
    // /*
    // * Persist model instance to the database. It will create
    // * a new row when model has not been persisted already,
    // * otherwise will update it.
    // * @async
    // * */
    // await job.save();

    // Fetch a job
    const jobs = await Job.all();

    return view.render('index', { jobs: jobs.toJSON() })



  }

  /**
   *
   * @param view
   * @param auth
   * @returns {Promise<*>}
   */


  async userIndex({view, auth}) {

    // Fetch all user's jobs
    const jobs = await auth.user.jobs().fetch();
    console.log(jobs)

    return view.render('jobs', { jobs: jobs.toJSON() })
  }

  /**
   *
   * @param request
   * @param response
   * @param session
   * @param auth
   * @returns {Promise<never|Response>}
   */

  async create({ request, response, session, auth}) {
    const job = request.all();

    const posted = await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description
    });

    session.flash({ message: 'Your job has been posted!' });
    return response.redirect('back');
  }

  /**
   *
   * @param response
   * @param session
   * @param params
   * @returns {Promise<never|Response>}
   */

  async delete({ response, session, params}) {
    const job = await Job.find(params.id);

    await job.delete();
    session.flash({ message: 'Your job has been removed'});
    return response.redirect('back');
  }

  /**
   *
   * @param params
   * @param view
   * @returns {Promise<*>}
   */

  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render('edit', { job: job });
  }

  /**
   *
   * @param response
   * @param request
   * @param session
   * @param params
   * @returns {Promise<never|Response>}
   */

  async update ({ response, request, session, params }) {
    const job = await Job.find(params.id);

    job.title = request.all().title;
    job.link = request.all().link;
    job.description = request.all().description;

    await job.save();

    session.flash({ message: 'Your job has been updated. '});
    return response.redirect('/post-a-job');
  }
}

module.exports = JobController;
