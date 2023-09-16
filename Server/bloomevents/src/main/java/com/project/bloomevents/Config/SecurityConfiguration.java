package com.project.bloomevents.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    @Autowired
    private final JwtAuthenticationFilter jwtAuthFilter;
    @Autowired
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and()
            .csrf()
            .disable()
                .authorizeHttpRequests()
                .requestMatchers(
//                        "/**",
                        "/user/auth/**",
                        "/addtoevent/get/**",
                        "/bookings/get/**",
                        "/category/get/**",
                        "/event/get/**",
                        "/upload/profilePic/**",
                        "/upload/ProviderLogos/**",
                        "/upload/ProviderImages/**",
                        "/logindetails/get/**",
                        "/package/get/**",
                        "/payment/get/**",
                        "/privatebooking/get/**",
                        "/provider/get/**",
                        "/review/get/**",
                        "/user/get/**"
//                        "/**"
                        )
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
