package com.john.blog.website;

import java.sql.Time;

import org.junit.Test;

public class CurrentTimeTest {

	@Test
	public void getCurrentTimeMillis() {
		Double time = (double) System.currentTimeMillis()/1000; 
		System.out.println(time);
	}
}
