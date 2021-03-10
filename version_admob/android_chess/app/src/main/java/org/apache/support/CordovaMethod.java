package org.apache.support;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.apache.support.ReflectiveCordovaPlugin.ExecutionThread;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface CordovaMethod {
    ExecutionThread value() default ExecutionThread.MAIN;
    String action() default "";
}
