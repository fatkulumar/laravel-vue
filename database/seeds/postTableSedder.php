<?php

use Illuminate\Database\Seeder;
use App\Post;

class postTableSedder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create('id_ID');
               foreach (range(1, 100) as $loop) {
            DB::table('posts')->insert([
                'title'      => 'Welcome'.$loop,
                'description'       => str_slug('Welcome'),
            ]);
        }
    }
}
